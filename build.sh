#!/bin/bash -e
# Build the letter on unix-compilant systems


###############################################################################


set -e          # exit on command errors (so you MUST handle exit codes properly!)
set -E          # pass trap handlers down to subshells
set -o pipefail # capture fail exit codes in piped commands
#set -x         # execution tracing debug messages

# Error handler
on_err() {
	echo ">> ERROR: $?"
	FN=0
	for LN in "${BASH_LINENO[@]}"; do
		[ "${FUNCNAME[$FN]}" = "main" ] && break
		echo ">> ${BASH_SOURCE[$FN]} $LN ${FUNCNAME[$FN]}"
		FN=$(( FN + 1 ))
	done
}
trap on_err ERR

# Exit handler
declare -a EXIT_CMDS
add_exit_cmd() { EXIT_CMDS+="$*;  "; }
on_exit(){ eval "${EXIT_CMDS[@]}"; }
trap on_exit EXIT

# Get command info
CMD_PWD=$(pwd)
CMD="$0"
CMD_DIR="$(cd "$(dirname "$CMD")" && pwd -P)"

# Defaults and command line options
[ "$VERBOSE" ] ||  VERBOSE=
[ "$DEBUG" ]   ||  DEBUG=
[ "$FILE_IN" ]   ||  FILE_IN="letter.md"	# assuming that you have a FILE_IN
[ "$FILE_OUT" ]   ||  FILE_OUT=	# assuming that you have a FILE_IN
[ "$COMPRESS" ]   ||  COMPRESS=false	# assuming that you have a FILE_IN
[ "$OPEN" ]   ||  OPEN=false	# assuming that you have a FILE_IN


# Basic helpers
out() { echo "$(date +%Y%m%dT%H%M%SZ): $*"; }
err() { out "$*" 1>&2; }
vrb() { [ ! "$VERBOSE" ] || out "$@"; }
dbg() { [ ! "$DEBUG" ] || err "$@"; }
die() { err "EXIT: $1" && [ "$2" ] && [ "$2" -ge 0 ] && exit "$2" || exit 1; }

# Show help function to be used below
show_help() {
	awk 'NR>1{print} /^(###|$)/{exit}' "$CMD"
	echo "USAGE: $(basename "$CMD") [arguments]"
	echo "ARGS:"
	MSG=$(awk '/^NARGS=-1; while/,/^esac; done/' "$CMD" | sed -e 's/^[[:space:]]*/  /' -e 's/|/, /' -e 's/)//' | grep '^  -')
	EMSG=$(eval "echo \"$MSG\"")
	echo "$EMSG"
}

# Parse command line options (odd formatting to simplify show_help() above)
NARGS=-1; while [ "$#" -ne "$NARGS" ]; do NARGS=$#; case $1 in
	# SWITCHES
	-h|--help)      # This help message
		show_help; exit 1; ;;
	-d|--debug)     # Enable debugging messages (implies verbose)
		DEBUG=$(( DEBUG + 1 )) && VERBOSE="$DEBUG" && shift && echo "#-INFO: DEBUG=$DEBUG (implies VERBOSE=$VERBOSE)"; ;;
	-v|--verbose)   # Enable verbose messages
		VERBOSE=$(( VERBOSE + 1 )) && shift && echo "#-INFO: VERBOSE=$VERBOSE"; ;;
	# PAIRS
	-i|--input)   # Set a input file to a value (DEFAULT: letter.md)
		shift && FILE_IN="$1" && shift && vrb "#-INFO: FILE_IN=$FILE_IN"; ;;
  -c|--compress)  # Compress and postprocess pdf output
    shift && COMPRESS="true" && shift && vrb "#-INFO: COMPRESS=$COMPRESS"; ;;
	-o|--open)  # Open file. Works only on osx
	shift && OPEN="true" && shift && vrb "#-INFO: OPEN=$OPEN"; ;;
	*)
		break;
esac; done

[ "$DEBUG" ]  &&  set -x

###############################################################################

# Validate some FILE_INs
#TODO: You will probably want to change this but this is an example of simple params validation
[ $# -gt 0 -a -z "$FILE_IN" ]  &&  FILE_IN="$1"  &&  shift
[ "$FILE_IN" ]  ||  die "You must provide some FILE_IN!"
[ $# -eq 0 ]  ||  die "ERROR: Unexpected commands!"

pandoc  --latex-engine=xelatex --template=template/template-letter.tex "$FILE_IN" -o "${FILE_IN%%.*}.pdf"
echo "${FILE_IN%%.*}.pdf built!"

if [ "$COMPRESS" = true ] ; then
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dDownsampleColorImages=true -dColorImageResolution=150 -dNOPAUSE  -dBATCH -sOutputFile="${FILE_IN%%.*}_c.pdf" "${FILE_IN%%.*}.pdf" > /dev/null && rm "${FILE_IN%%.*}.pdf" && mv "${FILE_IN%%.*}_c.pdf" "${FILE_IN%%.*}.pdf" 
fi

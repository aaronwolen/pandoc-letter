FROM pandoc/latex:latest

RUN tlmgr install mdframed etoolbox collection-fontsrecommended zref needspace

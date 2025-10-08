#!/bin/sh

OS="$(uname -s)"
ACTION="$1"

if [ "$ACTION" = "build" ]; then
  CMD="docker compose up -d --build"
else
  CMD="docker compose up -d"
fi

if [ "$OS" = "Linux" ]; then
  echo "Detectado Linux → usando sudo"
  sudo sh -c "$CMD"
else
  echo "Detectado $OS → ejecutando sin sudo"
  sh -c "$CMD"
fi

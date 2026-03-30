#!/bin/bash

echo "Collecting system information..."

HOST=$(hostname)
USER_NAME=$(whoami)
OS=$(grep '^PRETTY_NAME=' /etc/os-release | cut -d= -f2- | tr -d '"')
KERNEL=$(uname -r)
CPU=$(lscpu | awk -F: '/Model name/ {gsub(/^[ \t]+/, "", $2); print $2; exit}')
MACHINE_ID=$(cat /etc/machine-id)
DISK=$(df -h / | awk 'NR==2 {print $2}')

DATA="$HOST-$USER_NAME-$OS-$KERNEL-$CPU-$MACHINE_ID-$DISK"
FINGERPRINT=$(echo -n "$DATA" | sha256sum | awk '{print $1}')

echo ""
echo "===== SYSTEM INFO ====="
echo "Hostname: $HOST"
echo "User: $USER_NAME"
echo "OS: $OS"
echo "Kernel: $KERNEL"
echo "CPU: $CPU"
echo "Machine ID: $MACHINE_ID"
echo "Disk Size: $DISK"

echo ""
echo "===== UNIQUE FINGERPRINT ====="
echo "$FINGERPRINT"

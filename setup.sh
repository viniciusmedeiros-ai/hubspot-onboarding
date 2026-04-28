#!/bin/bash
# ────────────────────────────────────────────────────────
# setup.sh — Configura os vídeos para a plataforma
# Cria a pasta public/videos/ e copia (ou faz symlink) dos
# arquivos de vídeo a partir da pasta ../onboarding-videos/
# ────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VIDEOS_SRC="$SCRIPT_DIR/../onboarding-videos"
VIDEOS_DST="$SCRIPT_DIR/public/videos"

echo "→ Criando pasta public/videos/..."
mkdir -p "$VIDEOS_DST"

# ── Mapeamento: nome-destino ← arquivo-origem ──────────────

declare -A MAP=(
  ["getting-started-crm.mp4"]="Getting Started and CRM Setup 2026-04-27 10_26.mp4"
  ["content-marketing-leads.mp4"]="Content Marketing and Capturing Leads 2026-04-27 10_40/Content Marketing and Capturing Leads 2026-04-27 10_40_legendado.mp4"
  ["content-marketing-leads.srt"]="Content Marketing and Capturing Leads 2026-04-27 10_40/Content Marketing and Capturing Leads 2026-04-27 10_40_pt-BR.srt"
  ["segmentation-emails.mp4"]="Segmentation and Marketing Emails 2026-04-27 10_41/Segmentation and Marketing Emails 2026-04-27 10_41_legendado.mp4"
  ["segmentation-emails.srt"]="Segmentation and Marketing Emails 2026-04-27 10_41/Segmentation and Marketing Emails 2026-04-27 10_41_pt-BR.srt"
  ["selling-pitches-demos.mp4"]="Selling Series_ Creating Pitches and Delivering Demos 2026-04-27 10_31.mp4"
  ["selling-with-team.mp4"]="Selling Series_ How to Sell with Your HubSpot Team 2026-04-27 10_32.mp4"
  ["servicing-onboarding.mp4"]="Servicing Series_ Onboarding & Managing Your HubSpot Customers 2026-04-27 10_35.mp4"
  ["servicing-unlocking-success.mp4"]="Servicing Series_ Unlocking Success with New Customers 2026-04-27 10_38.mp4"
)

for DEST in "${!MAP[@]}"; do
  SRC="$VIDEOS_SRC/${MAP[$DEST]}"
  DST_FILE="$VIDEOS_DST/$DEST"

  if [ -f "$SRC" ]; then
    echo "  ✓ Copiando $DEST"
    cp "$SRC" "$DST_FILE"
  else
    echo "  ✗ Não encontrado: ${MAP[$DEST]}"
  fi
done

echo ""
echo "⚠️  Arquivos .srt precisam ser convertidos para .vtt para funcionar no browser."
echo "   Instale o ffmpeg e rode:"
echo "   ffmpeg -i public/videos/content-marketing-leads.srt public/videos/content-marketing-leads.vtt"
echo "   ffmpeg -i public/videos/segmentation-emails.srt public/videos/segmentation-emails.vtt"
echo ""
echo "✅ Setup concluído! Agora rode: npm install && npm run dev"

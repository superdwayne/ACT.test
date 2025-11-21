"use client"

type FigmaEmbedProps = {
  href?: string
  fileKey?: string
  nodeId?: string
  mode?: "design" | "prototype" | "dev"
  height?: number | string
  className?: string
}

function buildFigmaUrl({ href, fileKey, nodeId, mode = "dev" }: { href?: string; fileKey?: string; nodeId?: string; mode?: "design" | "prototype" | "dev" }) {
  if (href) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(href)}`
  }
  if (!fileKey) return ""
  const base = `https://www.figma.com/design/${fileKey}`
  const search = new URLSearchParams()
  if (nodeId) search.set("node-id", nodeId)
  if (mode) search.set("m", mode)
  const url = `${base}?${search.toString()}`
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
}

export default function FigmaEmbed({ href, fileKey, nodeId, mode = "dev", height = "80vh", className }: FigmaEmbedProps) {
  const src = buildFigmaUrl({ href, fileKey, nodeId, mode })
  if (!src) return null
  return (
    <iframe
      title="Figma Embed"
      src={src}
      className={className}
      style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height, border: 0, borderRadius: "12px" }}
      allowFullScreen
    />
  )
}


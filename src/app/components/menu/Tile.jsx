"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import TileArt from "./TileArt";

// Tile art is shared between a tile and its channel screen through framer's layoutId, so opening a
// channel zooms the tile up into the banner and closing it shrinks back. `from` says which grid the tile
// sits in (desktop menu "d", phone menu "m", inside the Projects folder "f"); "bar" means a shortcut button.
export const artId = (from, id) => `${from}-${id}`;

function Tile({ tile, from, onOpen, className = "" }) {
  if (tile.kind === "empty") {
    return (
      <div aria-hidden="true" className="tile-frame">
        <div className="h-full w-full rounded-[0.95rem] bg-[#e9ebee] shadow-[inset_0_2px_6px_rgba(0,0,0,0.07)]" />
      </div>
    );
  }
  // GitHub / GitLab / LinkedIn tiles are plain links straight to the profile, in a new tab
  if (tile.href) {
    return (
      <a href={tile.href} target="_blank" rel="noopener noreferrer" aria-label={`${tile.title} (opens in a new tab)`} className={`tile-frame ${className}`}>
        <div style={{ borderRadius: 15 }} className="art relative h-full w-full overflow-hidden">
          <TileArt tile={tile} />
        </div>
      </a>
    );
  }
  const label = tile.kind === "contact" ? "Copy my email address" : `Open ${tile.title}`;
  return (
    <button type="button" onClick={(e) => onOpen(tile.id, from, e.currentTarget)} aria-label={label} className={`tile-frame ${className}`}>
      <motion.div layoutId={artId(from, tile.id)} style={{ borderRadius: 15 }} className="art relative h-full w-full overflow-hidden">
        <TileArt tile={tile} />
      </motion.div>
    </button>
  );
}

// tiles only change when their own props do, so opening or closing a channel skips them
export default memo(Tile);

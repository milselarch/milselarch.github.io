import config from '@/config';
import React from 'react';

export function NavLinksGroup() {
  return (
    <div className="flex flex-col gap-2">
      {config.navLinks.map((link) => (
        <a
          key={link.name}
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          {link.name}
        </a>
      ))}
    </div>
  )
}

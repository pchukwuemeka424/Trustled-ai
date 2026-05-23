"use client";

import Link from "next/link";

type BlogManageToolbarProps = {
  isAdmin: boolean;
  isManaging: boolean;
};

export function BlogManageToolbar({ isAdmin, isManaging }: BlogManageToolbarProps) {
  if (!isAdmin) return null;

  return (
    <div className="live-edit-toolbar" role="region" aria-label="Blog manager">
      <span className="live-edit-toolbar-label">Blog</span>
      {isManaging ? (
        <>
          <Link href="/blog/new" className="live-edit-btn live-edit-btn--dark">
            New article
          </Link>
          <Link href="/blog" className="live-edit-btn live-edit-btn--ghost">
            View public
          </Link>
        </>
      ) : (
        <Link href="/blog?edit=1" className="live-edit-btn live-edit-btn--dark">
          Manage blog
        </Link>
      )}
    </div>
  );
}

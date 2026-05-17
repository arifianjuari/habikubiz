/** Item notifikasi in-app (nanti diisi dari Supabase `notifications`). */
export type InAppNotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAtLabel: string;
  read?: boolean;
  /** Untuk deep link opsional, mis. `/child/dashboard` */
  href?: string;
};

export const QUERY_KEYS = {
  // Auth
  me: ["me"],

  // Alerts
  alerts: ["alerts"],
  nearbyAlerts: ["alerts", "nearby"],
  hasActiveConfirmation: ["alerts", "has-active-confirmation"],
  alert: (id: string) => ["alerts", id],
  activeEngagement: ["alerts", "engagement"],

  // Donations
  myDonations: ["donations", "me"],
  donation: (id: string) => ["donations", id],

  // Donation Days (Journées de don)
  donationDays: ["donation-days"],
  publishedDays: (filters?: object) => ["donation-days", "published", filters],
  donationDay: (id: string) => ["donation-days", id],
  myRegistrations: (filters?: object) => [
    "donation-days",
    "my-registrations",
    filters,
  ],

  // Jambaar
  jambaarsProfile: ["jambaar", "me"],
  jambaarssBadges: ["jambaar", "me", "badges"],
  leaderboard: ["jambaar", "leaderboard"],
  leaderboardCity: (city: string) => ["jambaar", "leaderboard", "city", city],
  leaderboardDistrict: (district: string) => [
    "jambaar",
    "leaderboard",
    "district",
    district,
  ],

  // Rewards & Coupons
  rewards: ["rewards"],
  myCoupons: ["coupons", "me"],

  // Notifications
  myNotifications: ["notifications", "me"],
} as const;

import { Clipboard, showHUD, Toast, showToast } from "@raycast/api";

export default async function Command() {
  const notice = `[FORMAL NOTICE: SCOPE OF WORK RE-BASELINING & UCC § 2-209 CHANGE ORDER]

Date: ${new Date().toISOString().split("T")[0]}
Governing Law: Statutory UCC § 2-209 / Common Law Commercial Contract Standard

Dear Client,

This communication serves as formal statutory notice that the recent requested modifications, architectural adjustments, and feature expansions fall outside the executed Statement of Work (SOW).

Under UCC § 2-209 and established contract law, all out-of-scope work requires an executed written Change Order prior to code delivery and deployment. Continued unauthorized scope requests cannot be absorbed under fixed-price terms.

To execute the binding Change Order or review full fee schedule:
👉 Authorized Portal: https://patreon.com/c/scopelock
👉 Direct Wire Clearance: ahirwardhanmanti83@gmail.com

All deployment schedules and milestone warranties are temporarily frozen pending change order execution.`;

  await Clipboard.copy(notice);
  await showHUD("✅ ScopeLock UCC § 2-209 Notice Copied to Clipboard!");
  await showToast({
    style: Toast.Style.Success,
    title: "Notice Ready to Send",
    message: "Paste directly into Slack, Upwork, WhatsApp or Email."
  });
}

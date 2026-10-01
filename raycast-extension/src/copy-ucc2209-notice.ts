import { Clipboard, showHUD, Toast, showToast } from "@raycast/api";

export default async function Command() {
  const notice = ;

  await Clipboard.copy(notice);
  await showHUD("✅ ScopeLock UCC § 2-209 Notice Copied to Clipboard!");
}

import React, { useState } from "react";
import { Form, ActionPanel, Action, showToast, Toast, Clipboard } from "@raycast/api";

export default function Command() {
  const [project, setProject] = useState("SaaS Web Application");
  const [client, setClient] = useState("Client Enterprise LLC");
  const [amount, setAmount] = useState("1200");
  const [days, setDays] = useState("5");

  async function handleGenerate() {
    const doc = `# STATUTORY CHANGE ORDER NOTICE (UCC § 2-209)
Project: ${project}
Client: ${client}
Additional Fee: $${amount} USD
Delivery Extension: +${days} Business Days

This Change Order formally amends the primary development agreement.
Work on requested modifications will initiate upon client signature and clearance of the statutory retainer.

Authorized Signature: Krishna Ahirwar (Systems Architect)
Corporate Clearances: Dhanmanti Ahirwar (ahirwardhanmanti83@gmail.com)
Direct Portal: https://patreon.com/c/scopelock`;

    await Clipboard.copy(doc);
    await showToast({
      style: Toast.Style.Success,
      title: "Change Order Generated",
      message: "Ready to deliver to client!"
    });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Generate & Copy Change Order" onSubmit={handleGenerate} />
          <Action.OpenInBrowser title="Instant Legal Unlock ($2)" url="https://patreon.com/c/scopelock" />
        </ActionPanel>
      }
    >
      <Form.TextField id="project" title="Project Name" value={project} onChange={setProject} />
      <Form.TextField id="client" title="Client Name" value={client} onChange={setClient} />
      <Form.TextField id="amount" title="Additional Scope Cost ($)" value={amount} onChange={setAmount} />
      <Form.TextField id="days" title="Schedule Extension (Days)" value={days} onChange={setDays} />
    </Form>
  );
}

import React, { useState } from "react";
import { Form, ActionPanel, Action, showToast, Toast, Clipboard } from "@raycast/api";

export default function Command() {
  const [hours, setHours] = useState("12");
  const [rate, setRate] = useState("75");
  const [client, setClient] = useState("Client Enterprise LLC");
  const [features, setFeatures] = useState("Custom OAuth Integration, Export to Excel, Webhook alerts");

  const totalBleed = (parseFloat(hours) || 0) * (parseFloat(rate) || 0);

  async function handleSubmit() {
    const report = ;

    await Clipboard.copy(report);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Copy Legal Audit Report" onSubmit={handleSubmit} />
          <Action.OpenInBrowser title="Unlock Commercial Enforceability ()" url="https://patreon.com/c/scopelock" />
        </ActionPanel>
      }
    >
      <Form.TextField id="client" title="Client Name" value={client} onChange={setClient} />
      <Form.TextArea id="features" title="Unscoped Feature Requests" value={features} onChange={setFeatures} />
      <Form.TextField id="hours" title="Estimated Unbilled Hours" value={hours} onChange={setHours} />
      <Form.TextField id="rate" title="Hourly Rate ($/hr)" value={rate} onChange={setRate} />
    </Form>
  );
}

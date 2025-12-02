'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function ImportPDF() {
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadPDF() {
    if (!file) return;

    setLoading(true);
    setError("");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/import/pdf", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setProfile(data.profile);
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Import Your LinkedIn PDF</h1>

      <div className="flex gap-4">
        <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0])} />
        <Button onClick={uploadPDF}>{loading ? "Processing..." : "Upload"}</Button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {profile && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.headline}</p>
          <p className="mt-1">{profile.location}</p>

          <h3 className="font-semibold mt-4">Contact</h3>
          <p>📞 {profile.contact.phone}</p>
          <p>✉ {profile.contact.email}</p>
          <p>🔗 {profile.contact.linkedin}</p>

          <h3 className="font-semibold mt-4">Skills</h3>
          <ul className="list-disc ml-4">
            {profile.skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <h3 className="font-semibold mt-4">Certifications</h3>
          <ul className="list-disc ml-4">
            {profile.certifications.map((c, i) => <li key={i}>{c}</li>)}
          </ul>

          <h3 className="font-semibold mt-4">Experience</h3>
          <ul className="list-disc ml-4">
            {profile.experience.map((e, i) => <li key={i}>{e}</li>)}
          </ul>

          <h3 className="font-semibold mt-4">Education</h3>
          <ul className="list-disc ml-4">
            {profile.education.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </Card>
      )}
    </div>
  );
}

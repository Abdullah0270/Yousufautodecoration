import { getSettings } from "@/actions/settings";
import SettingsForm from "@/admin/SettingsForm";
import AdminAuth from "../AdminAuth";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    
    <AdminAuth>
      <div className="max-w-3xl">
        <SettingsForm settings={settings} />
      </div>
    </AdminAuth>
  );
}
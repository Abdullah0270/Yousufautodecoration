"use client";

import { saveSettings } from "@/actions/settings";
import {
  Building2,
  Phone,
  MessageCircle,
  MapPin,
  Save,
  Globe,
} from "lucide-react";
import { FaFacebookF, FaInstagram ,FaYoutube} from "react-icons/fa";


export default function SettingsForm({
  settings,
}: {
  settings: any;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl">

      {/* Page Header */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
            <Globe size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Website Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your business information and online presence.
            </p>
          </div>

        </div>

      </div>

      {/* Main Card */}

      <form
        action={saveSettings}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50"
      >

        {/* Card Header */}

        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 to-slate-900 px-6 py-6 text-white sm:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
              <Building2 size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Business Information
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                This information will be displayed throughout your website.
              </p>
            </div>

          </div>

        </div>

        {/* Form Body */}

        <div className="space-y-10 p-6 sm:p-8">

          {/* Business Information */}

          <section>

            <div className="mb-6">

              <h3 className="text-lg font-bold text-slate-900">
                Company Details
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add your basic business contact information.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Company Name */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Building2 size={16} className="text-orange-500" />
                  Company Name
                </label>

                <input
                  name="companyName"
                  defaultValue={settings?.companyName || ""}
                  placeholder="Enter company name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <Phone size={16} className="text-orange-500" />
                  Phone Number
                </label>

                <input
                  name="phone"
                  defaultValue={settings?.phone || ""}
                  placeholder="03XXXXXXXXX"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* WhatsApp */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <MessageCircle size={16} className="text-green-500" />
                  WhatsApp Number
                </label>

                <input
                  name="whatsapp"
                  defaultValue={settings?.whatsapp || ""}
                  placeholder="923XXXXXXXXX"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Use country code format for WhatsApp links.
                </p>
              </div>

              {/* Address */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <MapPin size={16} className="text-orange-500" />
                  Company Address
                </label>

                <input
                  name="address"
                  defaultValue={settings?.address || ""}
                  placeholder="Enter complete company address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

            </div>

          </section>

          {/* Social Media */}

          <section className="border-t border-slate-100 pt-10">

            <div className="mb-6">

              <h3 className="text-lg font-bold text-slate-900">
                Social Media
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Connect your social media profiles with your website.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Facebook */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <FaFacebookF size={16} className="text-blue-600" />
                  Facebook URL
                </label>

                <input
                  name="facebook"
                  defaultValue={settings?.facebook || ""}
                  placeholder="https://facebook.com/yourpage"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* Instagram */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <FaInstagram size={16} className="text-pink-500" />
                  Instagram URL
                </label>

                <input
                  name="instagram"
                  defaultValue={settings?.instagram || ""}
                  placeholder="https://instagram.com/yourpage"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />
              </div>

              {/* YouTube */}

              <div className="md:col-span-2">

                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                  <FaYoutube size={16} className="text-red-500" />
                  YouTube URL
                </label>

                <input
                  name="youtube"
                  defaultValue={settings?.youtube || ""}
                  placeholder="https://youtube.com/@yourchannel"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                />

              </div>

            </div>

          </section>

          {/* Save */}

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="font-semibold text-slate-800">
                Save your changes
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your updated information will appear on the website.
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 active:translate-y-0"
            >
              <Save size={19} />
              Save Settings
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}
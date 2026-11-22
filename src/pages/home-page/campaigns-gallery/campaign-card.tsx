import { Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  CallToActionButton,
  CallToActionCard,
} from "@/components/call-to-action-card";
import { getAssetUrl } from "@/lib/directus-assets";
import { stripHtml } from "@/lib/strip-html";
import { useDonationFormatters } from "@/pages/dashboard/hooks/use-donation-formatters";
import type { CampaignSummary } from "./hooks/use-campaigns-gallery-data";

export function CampaignCard({ campaign }: { campaign: CampaignSummary }) {
  const { t } = useTranslation();
  const { currency } = useDonationFormatters();

  const sanitizedHtml = useMemo(
    () =>
      campaign.description ? DOMPurify.sanitize(campaign.description) : "",
    [campaign.description],
  );
  const plainDescription = useMemo(
    () => stripHtml(sanitizedHtml),
    [sanitizedHtml],
  );
  const thumbnailUrl = getAssetUrl(campaign.thumbnailId, {
    width: 640,
    height: 640,
    fit: "cover",
  });
  const pledged = campaign.paidAmount + campaign.outstandingAmount;
  const hasGoal = campaign.goal !== undefined && campaign.goal > 0;
  const progress = hasGoal
    ? Math.min(100, Math.max(0, (pledged / (campaign.goal as number)) * 100))
    : 0;

  return (
    <Link
      to="/campaigns/$slug"
      params={{ slug: campaign.slug ?? "" }}
      className="group block h-full min-w-0 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-donation-gold"
    >
      <CallToActionCard thumbnailUrl={thumbnailUrl} className="min-h-80">
        <h3 className="title-content text-2xl leading-snug font-semibold wrap-anywhere">
          {campaign.name}
        </h3>
        {plainDescription && (
          <p className="line-clamp-3 text-sm leading-relaxed text-white/85">
            {plainDescription}
          </p>
        )}
        <div className="mt-auto">
          <p className="text-xl font-bold tabular-nums">
            <bdi>{currency.format(pledged)}</bdi>
          </p>
          {hasGoal ? (
            <>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"
                role="progressbar"
                aria-label={t("donation.gallery.goal")}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="h-full rounded-full bg-donation-gold"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-white/70">
                {t("donation.gallery.ofGoal", {
                  goal: currency.format(campaign.goal as number),
                })}
              </p>
            </>
          ) : (
            <p className="mt-1.5 text-xs text-white/70">
              {t("donation.gallery.raisedSoFar")}
            </p>
          )}
        </div>
        <CallToActionButton asChild className="group-hover:bg-[#d9b752]">
          <span>
            {t("donation.gallery.viewDetails")}
            <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
          </span>
        </CallToActionButton>
      </CallToActionCard>
    </Link>
  );
}

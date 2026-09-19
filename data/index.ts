import siteData from "./site.json";

// ── Root Schema Types ──
export type RawSiteData = typeof siteData;
export type TourSchema = typeof siteData.Tour;
export type TourSections = TourSchema["sections"];
export type TourTemplateComponents = TourSchema["templateComponents"];

// ── Universal SectionProps Interface (ai-builder Standard) ──
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// ── Strongly Typed Section Variant Data Models ──
export type TourTopbarData = TourSections["Topbar"]["variants"]["TourTopbar1"];
export type TourHeaderData = TourSections["Header"]["variants"]["TourHeader1"];
export type TourBannerData = TourSections["Banner"]["variants"]["TourBanner1"];
export type TourTopDestinationsData =
  TourSections["TopDestinations"]["variants"]["TourTopDestinations1"];
export type TourTopDestinationsListingData =
  TourSections["TopDestinationsListing"]["variants"]["TourTopDestinationsListing1"];
export type TourGalleryData = TourSections["Gallery"]["variants"]["TourGallery1"];
export type TourPopularToursData =
  TourSections["PopularTours"]["variants"]["TourPopularTours1"];
export type TourServicesData = TourSections["Services"]["variants"]["TourServices1"];
export type TourWhyChooseUsData =
  TourSections["WhyChooseUs"]["variants"]["TourWhyChooseUs1"];
export type TourAboutData = TourSections["About"]["variants"]["TourAbout1"];
export type TourMissionVisionData =
  TourSections["MissionVision"]["variants"]["TourMissionVision1"];
export type TourAwardsData = TourSections["Awards"]["variants"]["TourAwards1"];
export type TourTeamData = TourSections["Team"]["variants"]["TourTeam1"];
export type TourFAQData = TourSections["FAQ"]["variants"]["TourFAQ1"];
export type TourTestimonialData =
  TourSections["Testimonial"]["variants"]["TourTestimonial1"];
export type TourStatsData =
  TourSections["CompanyStatistics"]["variants"]["TourStats1"];
export type TourBlogData = TourSections["Blog"]["variants"]["TourBlog1"];
export type TourFooterData = TourSections["Footer"]["variants"]["TourFooter1"];
export type TourServicesPageData =
  TourSections["ServicesPage"]["variants"]["TourServicesPage1"];
export type TourPackagesPageData =
  TourSections["TourPackages"]["variants"]["TourPackagesPage1"];
export type TourBlogPageData = TourSections["BlogPage"]["variants"]["TourBlogPage1"];
export type TourPartnersData = TourSections["Partners"]["variants"]["TourPartners1"];
export type TourContactData = TourSections["Contact"]["variants"]["TourContact1"];
export type TourPrivacyPolicyData =
  TourSections["PrivacyPolicy"]["variants"]["TourPrivacyPolicy1"];
export type TourSitemapData = TourSections["Sitemap"]["variants"]["TourSitemap1"];
export type TourNotFoundData = TourSections["NotFound"]["variants"]["TourNotFound1"];

// ── Item-level types inferred from site.json ──
export type TourTeamMember = TourTeamData["items"][number];
export type TourTeamMemberDetails = TourTeamMember["details"];
export type TourServiceItem = TourServicesPageData["items"][number];
export type TourServiceDetails = TourServiceItem["details"];
export type TourBlogPost = TourBlogPageData["items"][number];
export type TourBlogSidebar = TourBlogPageData["sidebar"];
export type TourPackage = TourPackagesPageData["items"][number];
export type TourNavLink = TourHeaderData["links"][number];

// ── Legacy Site Map for Standalone Tour.com Site ──
const sec = siteData.Tour.sections;

const site = {
  topbar: sec.Topbar.variants.TourTopbar1,
  navbar: sec.Header.variants.TourHeader1,
  hero: sec.Banner.variants.TourBanner1,
  destinationsSection: sec.TopDestinations.variants.TourTopDestinations1,
  topDestinationsPage: sec.TopDestinationsListing.variants.TourTopDestinationsListing1,
  galleryPage: sec.Gallery.variants.TourGallery1,
  popularToursSection: sec.PopularTours.variants.TourPopularTours1,
  ourServicesSection: sec.Services.variants.TourServices1,
  whyChooseUsSection: sec.WhyChooseUs.variants.TourWhyChooseUs1,
  aboutUsSection: sec.About.variants.TourAbout1,
  missionVisionSection: sec.MissionVision.variants.TourMissionVision1,
  awardsSection: sec.Awards.variants.TourAwards1,
  teamSection: sec.Team.variants.TourTeam1,
  faqPage: sec.FAQ.variants.TourFAQ1,
  testimonialSection: sec.Testimonial.variants.TourTestimonial1,
  statsSection: sec.CompanyStatistics.variants.TourStats1,
  blogSection: sec.Blog.variants.TourBlog1,
  footer: sec.Footer.variants.TourFooter1,
  servicesPageSection: sec.ServicesPage.variants.TourServicesPage1,
  tourPackagesPage: sec.TourPackages.variants.TourPackagesPage1,
  blogPage: sec.BlogPage.variants.TourBlogPage1,
  partnersPage: sec.Partners.variants.TourPartners1,
  contactPage: sec.Contact.variants.TourContact1,
  privacyPolicyPage: sec.PrivacyPolicy.variants.TourPrivacyPolicy1,
  sitemapPage: sec.Sitemap.variants.TourSitemap1,
  notFoundPage: sec.NotFound.variants.TourNotFound1,
  Tour: siteData.Tour,
};

export type SiteData = typeof site;
export { site };
export default siteData;

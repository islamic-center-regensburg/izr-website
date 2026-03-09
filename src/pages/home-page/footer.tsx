import { useTranslation } from "react-i18next";
import SocialLinks from "./social-links";

// Create a Footer component with copyright information
const Footer = () => {
	const { t } = useTranslation();
	return (
		<div className="w-full mt-20 min-h-40 bg-linear-to-br from-transparent to-primary px-4 py-8">
			<div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
				<SocialLinks />
				<p className="text-center text-xs text-white">
					&copy; <span className="time-ltr ">{new Date().getFullYear()}</span>{" "}
					{t("footer.copyright")}
				</p>
			</div>
		</div>
	);
};

export default Footer;

// Create a Footer component with copyright information
const Footer = () => {
	return (
		<p className="text-center h-20 text-sm">
			&copy; <span className="time-ltr ">{new Date().getFullYear()}</span>{" "}
			Islamic Center Regensburg. All rights reserved
		</p>
	);
};

export default Footer;

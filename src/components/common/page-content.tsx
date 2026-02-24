import NotFound from "@/src/app/not-found";
import { siteConfig } from "@/src/config/site.config";
import DOMPurify from "isomorphic-dompurify";
import { usePathname } from "next/navigation";
import parse from 'html-react-parser';

const PageContent = () => {
	const pathName = usePathname();

	const pageContent = siteConfig.pageContent[pathName as keyof typeof siteConfig.pageContent];
	console.log('pageContent', pageContent)

	if (!pageContent) {
		return <NotFound />
	}

	const cleanHtml = DOMPurify.sanitize(pageContent.content);
	return (
		<>
			<div>{parse(cleanHtml)}</div>
		</>
	)
}

export default PageContent;

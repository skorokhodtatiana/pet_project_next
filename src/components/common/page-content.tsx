import NotFound from "@/src/app/not-found";
import { siteConfig } from "@/src/config/site.config";
import { usePathname } from "next/navigation";

const PageContent = () => {
	const pathName = usePathname();

	const pageContent = siteConfig.pageContent[pathName as keyof typeof siteConfig.pageContent];
	console.log('pageContent', pageContent)

	if (!pageContent) {
		return <NotFound></NotFound>
	}

	return (
		<>
			{pageContent.content}
		</>
	)
}

export default PageContent;

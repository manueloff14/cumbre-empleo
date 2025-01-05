import BannerAds from "./ads/BannerAds";
import JobDescription from "./JobDescription";
import PanelLateral from "./PanelLateral";

export default function JobData({ data, jobDetails, isExpired, isDarkMode }) {
    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start py-3">
            <ul className="space-y-6 w-full lg:w-[60%]">
                {/* Condicional para mostrar el mensaje basado en isExpired */}
                <div className="w-full">
                    {isExpired ? '' : <BannerAds isDarkMode={isDarkMode} />}
                </div>
                <JobDescription jobDescription={data.jobDescription} />
            </ul>
            <div className="w-full lg:w-[50%]">
                <PanelLateral data={data} jobDetails={jobDetails} />
            </div>
        </div>
    );
}

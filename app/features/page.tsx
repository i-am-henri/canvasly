import Link from "next/link";
import Svg from "../svg";

export default function Features() {
    return (
        <div className="w-full min-h-screen items-center text-center flex justify-center flex-col" style={{ minHeight: "100dvh" }}>
            <div className="text-center">
                <h2 className="text-2xl">search it</h2>
                <p className="text-center text-[#808080]">Thanks to documents, you are able to research together with your friends.</p>
            </div>
            <svg  className="w-10 h-10" viewBox="0 0 146 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 22.7391C3.2493 18.6212 9.36901 3.15474 13.1781 13.8771C13.5772 15.0005 14.5729 21.0983 15.773 21.2495C16.8445 21.3844 18.9903 7.78201 22.1436 5.98981C26.938 3.26488 28.4723 10.151 30.0999 13.0396C35.0639 21.8494 33.2842 15.9415 35.8594 9.90254C38.3383 4.0895 41.493 12.3267 42.889 14.4125C46.0529 19.1395 46.437 9.45775 49.1634 6.60421C51.8321 3.81116 54.3934 5.2678 55.9596 8.11779C59.2847 14.1687 59.9155 15.1943 62.2752 7.79515C65.2247 -1.45377 68.0072 10.2381 70.3173 13.4171C73.7248 18.1065 73.9382 1.87789 77.8068 2.98317C78.9914 3.32163 84.5475 17.5554 86.2093 13.9697C89.5418 6.77907 88.7822 9.75336 92.3498 16.1423C96.5607 23.6832 98.8714 6.9014 101.109 5.39262C103.359 3.87582 104.814 19.0214 109.258 8.66009C114.387 -3.29835 113.063 3.08672 118.261 10.2046C122.705 16.2905 123.024 -5.82656 127.697 3.19256C132.875 13.1865 134.911 9.78693 144.275 11.4333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
                <h2 className="text-2xl">create it</h2>
                <p className="text-center text-[#808080]">Create your presentations easy with ai and in our optimated web-editor.</p>
            </div>
            <svg  className="w-10 h-10" viewBox="0 0 146 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 22.7391C3.2493 18.6212 9.36901 3.15474 13.1781 13.8771C13.5772 15.0005 14.5729 21.0983 15.773 21.2495C16.8445 21.3844 18.9903 7.78201 22.1436 5.98981C26.938 3.26488 28.4723 10.151 30.0999 13.0396C35.0639 21.8494 33.2842 15.9415 35.8594 9.90254C38.3383 4.0895 41.493 12.3267 42.889 14.4125C46.0529 19.1395 46.437 9.45775 49.1634 6.60421C51.8321 3.81116 54.3934 5.2678 55.9596 8.11779C59.2847 14.1687 59.9155 15.1943 62.2752 7.79515C65.2247 -1.45377 68.0072 10.2381 70.3173 13.4171C73.7248 18.1065 73.9382 1.87789 77.8068 2.98317C78.9914 3.32163 84.5475 17.5554 86.2093 13.9697C89.5418 6.77907 88.7822 9.75336 92.3498 16.1423C96.5607 23.6832 98.8714 6.9014 101.109 5.39262C103.359 3.87582 104.814 19.0214 109.258 8.66009C114.387 -3.29835 113.063 3.08672 118.261 10.2046C122.705 16.2905 123.024 -5.82656 127.697 3.19256C132.875 13.1865 134.911 9.78693 144.275 11.4333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
                <h2 className="text-2xl">export it</h2>
                <p className="text-center text-[#808080]">Export your presentation to Power Point without a watermark.</p>
            </div>
            <div className="absolute flex bottom-3 *:text-[#808080]">
                <Link href={"/"}>home</Link>
                <Svg />
                <Link href={"/pricing"}>pricing</Link>
                <Svg />
                <Link className="" href={"/features"}>
                    features
                </Link>
            </div>
        </div>
    )
}
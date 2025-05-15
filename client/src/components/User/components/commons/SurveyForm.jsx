import { IoCheckmarkCircleSharp } from "react-icons/io5";


const SurveyForm = ({ surveyOption, setSurveyOption, options }) => {
    return (
        <div className="flex flex-col gap-3  relative text-gray-800 md:text-lg">
            <div className="bg-white sticky z-50">
            <h3 className=" font-bold text-center text-gray-800 md:text-2xl text-xl f">How did you hear about us?</h3>
            <p className="text-center text-xs text-blue-500 text-medium">We Value your answer 😊</p>
            </div>

            <div className="max-h-[400px] overflow-y-scroll ">

            {options?.map((option, index) => (
                <div className="flex items-center  mb-2 " key={index}>
                    <div onClick={()=>setSurveyOption(option)}
                    className={`mx-5 cursor-pointer flex items-center justify-between gap-3 hover:bg-blue-600 hover:text-white px-4  border w-full p-2 rounded-lg font-bold  ${surveyOption === option ? "bg-blue-600 text-white " : "text-gray-800"}`} >
                        { option}
                       {surveyOption===option ? <IoCheckmarkCircleSharp className="text-green-500 bg-white rounded-full" /> :''}
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
};

export default SurveyForm;
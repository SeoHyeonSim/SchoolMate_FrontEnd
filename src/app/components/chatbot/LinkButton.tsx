import React from "react";

interface LinkButtonProps {
    linkTo: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ linkTo }) => {
    const handleClick = () => {
        window.close()
        window.open(linkTo, "_blank", "noopener,noreferrer");
        
    };

    return (
        <div>
            <div>더 자세한 정보는 아래 페이지를 통해 확인할 수 있습니다.</div>
            <button
                onClick={handleClick}
                className={`bg-blue-300 min-h-[40px] max-h-[370px] w-full rounded-md flex items-center justify-center overflow-y-auto p-2 flex-shrink-0 mt-2 `}
            >
                <div className="text-white">바로가기</div>
            </button>
        </div>
    );
};

export default LinkButton;

import React from "react";
import Button from '@/components/common/Button'; // 例: 共通コンポーネントのインポート
import { formatDateToYYYYMMDD } from "@/lib/date";
import { format } from "path";

export default function Profile() {
    const reviewItems = [
        {
            img: "",
            name: "",
            date: formatDateToYYYYMMDD(new Date()), // とりあえず今日の日付
            stars: 4.3,
            message: "Great trader! Very responsive and fair. Would trade again."
        }
    ]

    return (<>
        <section>
            {/* profile header */}
            <div className="max-w-full flex flex-col justify-center p-[16px] gap-4">
                <div className="flex flex-col items-center gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face"
                        alt="John Doe"
                        className="w-[128px] h-[128px] rounded-full"
                    />
                    <div className="flex flex-col items-center">
                        <p className="text-[22px] font-bold">
                            Alex
                        </p>
                        <p>
                            Trainer since 2010
                        </p>
                    </div>
                </div>
                <Button
                    type="submit"
                    variant="secondary"
                    size="medium"
                    fullWidth
                    isLoading={false} // ローディングなし
                    disabled={false}
                    className="w-[480px] min-w-[84px] w-full max-w-[480px] @[480px]:w-auto mx-auto font-normal"
                >
                    Edit Profile
                </Button>
            </div>

            {/* title header */}
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">About</h2>

            <div className="flex flex-col p-[16px]">
                <div className="flex gap-x-6">
                    <div className="w-[186px] text-sm font-normal border-t border-t-[#dbe0e6] py-5">
                        <p className="">Trainer ID</p>
                        <p className="">123456789</p>
                    </div>
                    <div className="flex-auto text-sm font-normal border-t border-t-[#dbe0e6] py-5">
                        <p className="">Since</p>
                        <p className="">2010</p>
                    </div>
                </div>

                <div className="flex gap-x-6">
                    <div className="w-[186px] text-sm font-normal border-t border-t-[#dbe0e6] py-5">
                        <p className="">Location</p>
                        <p className="">San Francisco, CA</p>
                    </div>
                    <div className="flex-auto text-sm font-normal border-t border-t-[#dbe0e6] py-5">
                        <p className="">Favorite Pokemon</p>
                        <p className="">Charizard</p>
                    </div>
                </div>

            </div>

            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Rating</h2>

            {/* Reviews */}
            <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Reviews</h2>
            {/* Review Items */}
            <div className="flex flex-col p-[16px] gap-8">
                <div className="flex flex-col gap-3 max-width">
                    <div className="flex">
                        <img
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=32&h=32&fit=crop&crop=face"
                            alt="John Doe"
                            className="size-10 rounded-full"
                        />
                        <div className='ml-3 flex flex-col'>
                            <span className="text-sm font-medium text-gray-700">John Doe</span>
                            <span className="text-xs text-gray-500">2025-07-03</span>
                        </div>
                    </div>
                    <div>
                        stars
                    </div>
                    <p className="text-[16px]">
                        Great trader! Very responsive and fair. Would trade again.
                    </p>
                    <div className="flex gap-9 text-[#60758a]">
                        <button className="flex items-center gap-2">
                            <div className="text-inherit" data-icon="ThumbsUp" data-size="20px" data-weight="regular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                    <path
                                        d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"
                                    ></path>
                                </svg>
                            </div>
                            <p className="text-inherit">2</p>
                        </button>
                        <button className="flex items-center gap-2">
                            <div className="text-inherit" data-icon="ThumbsDown" data-size="20px" data-weight="regular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                                    <path
                                        d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section >
    </>
    );
}
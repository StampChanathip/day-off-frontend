"use client";
import { homepage } from "@/api/homePageApi";
import Loading from "@/components/utils/Loading";
import { withForm } from "@/shared/constants/form";
import { CalendarIcon, InformationIcon } from "@/shared/icons/icons";
import { BotHolidaysResponse } from "@/shared/types/api/holidaysApiType";
import { HolidayItemDisplay } from "@/shared/types/holidaysType";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const HolidaysInput = withForm({
  defaultValues: {
    leaveAmount: 1,
  },
  render: function Render() {
    const { data: holidaysList = [], isLoading } = useQuery<
      HolidayItemDisplay[]
    >({
      queryKey: ["user-holidays/BOT"],
      queryFn: async () => {
        const result = await homepage.getBotHolidaysList();

        return result.data.map((item: BotHolidaysResponse) => ({
          name: item.nameEN,
          dateTime: dayjs(item.dateTime),
        }));
      },
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

    return (
      <Loading isLoading={isLoading}>
        <fieldset className="fieldset border border-base-300 p-4 rounded-box space-y-3">
          <div>
            <span className="flex items-center space-x-2">
              <div aria-label="status" className="status status-primary" />
              <p className="fieldset-label text-lg">Public Holidays</p>
            </span>
            <p className="fieldset-label">
              Use holidays based on Bank of Thailand (BOT) holidays or customize
              holidays to fit your company days off
            </p>
          </div>
          <ul className="list bg-base-100 rounded-box border border-base-300 p-4">
            <div className="flex justify-between">
              <div className="flex items-center space-x-3 ">
                <CalendarIcon />
                <div className="flex flex-col">
                  <span className="flex space-x-1 items-center">
                    <p className="text-base">Public Holidays</p>
                    <div
                      className="tooltip"
                      data-tip="Initial holidays are based on BOT holidays"
                    >
                      <InformationIcon className="size-4" />
                    </div>
                  </span>
                  <p className="text-xs">
                    {holidaysList?.length ?? 0} dates selected
                  </p>
                </div>
              </div>
              {/* TODO: add edit logic */}
              {/* <button className="btn btn-secondary btn-soft">Edit</button> */}
            </div>

            {holidaysList?.map((item, idx) => (
              <li className="list-row" key={`holidays_${idx}`}>
                <div className="text-2xl font-thin opacity-60 text-neutral">
                  {item.dateTime.format("DD")}/{item.dateTime.format("MM")}
                </div>
                <div className="list-col-grow">
                  <div>{item.name}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {item.dateTime.format("DD MMM YYYY")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </fieldset>
      </Loading>
    );
  },
});

export default HolidaysInput;

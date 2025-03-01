import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);
dayjs.locale("th");

export const fromNow = (date: string) => {
    return dayjs(date).fromNow();
};

export const time = (date: string) => {
    return dayjs(date).format("HH:mm");
};

export const dateShort = (date: string) => {
    return dayjs(date).format("DD MMM BBBB");
};

export const dateLong = (date: string) => {
    return dayjs(date).format("DD MMMM BBBB, HH:mm");
};

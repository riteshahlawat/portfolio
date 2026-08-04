import ElDoradoClient from "./el-dorado-client";

export const metadata = {
    title: "el dorado",
    robots: { index: false, follow: false },
};

export default function ElDorado() {
    return <ElDoradoClient />;
}

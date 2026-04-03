import FIllform from "@/components/form/Fillform";

export default async function FillForm({
  params,
}: {
  params: Promise<{ details: string[] }>;
}) {
  const { details } = await params;
  console.log(details);
  const [adminId, eventName] = details;
  const adminIdNum = Number(adminId);

  return (
    <div className=" bg-[#0e0e10] w-full min-h-screen ">
      <FIllform adminId={adminIdNum} eventName={`${eventName}`} />
    </div>
  );
}

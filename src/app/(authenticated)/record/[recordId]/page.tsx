interface Props {
  recordId: string;
}

export default async function RecordPage({ params }: { params: Props }) {
  const { recordId } = params;

  return (
    <h1>Record {recordId}</h1>
  )
}

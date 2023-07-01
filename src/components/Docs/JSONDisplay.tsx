import CoreCode from "../Core/Code";

const JSONDisplay = (data: unknown) => <CoreCode text={JSON.stringify(data, null, 2)} language="json" />

export default JSONDisplay;

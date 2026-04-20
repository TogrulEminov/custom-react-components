import MyForm from "./FormUse";
import RichEditor from "./lib/rich-editor";

function App() {
    return (
        <div className={"container mx-auto my-20"}>
            <RichEditor />

            <MyForm />
        </div>
    )
}

export default App

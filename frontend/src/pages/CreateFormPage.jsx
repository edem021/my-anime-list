import CreateVtuberForm from "../components/form_components/CreateVtuberForm.jsx";
import CreateSongForVtuberForm from "../components/form_components/CreateSongForVtuberForm.jsx";

const CreateFormPage = ({ refetchApi }) => {
  return (
    <div
      className="flex py-10 justify-center"
      style={{ width: "calc(100vw - 18rem)" }}
    >
      <div className="w-[1200px] min-h-screen bg-gradient-to-tr from-base-300 to-base-200 rounded-md shadow shadow-black flex flex-col items-center gap-5 p-10 text-shadow text-shadow-black">
        <h2 className="text-5xl tracking-wide">Create Form</h2>

        <CreateVtuberForm />

        <CreateSongForVtuberForm refetchApi={refetchApi} />
      </div>
    </div>
  );
};

export default CreateFormPage;

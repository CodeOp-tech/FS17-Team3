import React, {useState} from 'react';

function UploadForm(props) {
    const [profileFile, setProfileFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    function handleFileChange(event) {
        setProfileFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('myfile', profileFile, profileFile.name);

        props.uploadProfileCb(formData)

        setProfileFile(null);
    }

    function handleCoverChange(event) {
        setCoverFile(event.target.files[0]);
    }

    function handleCoverSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('myfile', coverFile, coverFile.name);

        props.uploadCoverCb(formData)

        setCoverFile(null);
    }
    

    return (
        <div>
        <div className="upload-form">
            <form onSubmit={handleSubmit}>
            <label>Upload Profile Picture
            <input type="file"
                   onChange={handleFileChange}
                   />
            </label>
            <button type="submit">Upload</button>
            </form>     
        </div>

<div className="upload-form">
<form onSubmit={handleCoverSubmit}>
<label>Upload Cover Photo
<input type="file"
       onChange={handleCoverChange}
       />
</label>
<button type="submit">Upload</button>
</form>     
</div>

</div>
    )
}

export default UploadForm;
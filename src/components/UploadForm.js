import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone';
import { Segment, Button } from 'semantic-ui-react';

import { UPLOAD_FILE } from '../util/graphql';

function UploadForm(segmentClass) {
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const onDrop = useCallback(
        ([file]) => {
            uploadFile({ variables: { file } });
        },
        [uploadFile]
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    segmentClass = segmentClass === undefined ? segmentClass : 'upload-form';
    
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()}/>
            <Segment className={segmentClass}>
                {isDragActive ? (
                    <p style={{ marginTop: 10 }}>Drop the files here ...</p>
                ) : (
                    <>
                        <p style={{ marginTop: 10 }}>Drag and drop files here, or select files:</p>
                        <Button basic color='blue' type='button' onClick={open}>Add File</Button>
                    </>
                )}
            </Segment>
        </div>
    );
};

export default UploadForm;
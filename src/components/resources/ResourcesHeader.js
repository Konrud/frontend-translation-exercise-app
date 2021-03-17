import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HeaderText, SubHeaderText } from '../../styles/commonStyles';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader({ lang = "en-US" }) {
    const { t } = global;
    /* First option using `import` (translation data is in the same folder as a component) */
    const [translateStrings, setTranslateStrings] = useState(null);

    useEffect(function () {
        async function getTranslationStrings() {
            try {
                const result = await import("./locales/resourcesheader/" + lang + "/strings.json");
                if (result && result.default) {
                    setTranslateStrings(result.default);
                    return;
                }
            } catch (e) {
                console.error("error from ResourcesHeader: " + e.message);
            }
        };
        getTranslationStrings();
    }, []);


    if (!translateStrings) {
        return <p style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>loading...</p>;
    }

    return (
        <>
            <ResourceHeaderText>{t(translateStrings['RESOURCES_HEADER_TITLE'])}</ResourceHeaderText>
            <SubHeaderText>{t(translateStrings['RESOURCES_HEADER_SUBTITLE'])}</SubHeaderText>
        </>
    );
}

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/SectionHeader';
import { ReadOnlyTextArea, TextField } from '../../../fields';
import useFetch from '../../../../Hooks/useFetch/useFetch';

const SectionContainer = styled.div`
    width: 60%;
    border-right: 1px solid lightgray;
    padding: 0 12px 5px;
    min-height: 100%;
`;

const FieldsContainer = styled.div`
    margin-top: 6px;
`;

export default function GeneralDetailsSection({ resource, lang = "en-US" }) {
    const { t } = global;
    const { name, description, resourceType, path } = resource;
    /* Second option using `fetch` (translation data is in the `public` folder) */
    /*NOTE: regarding the lang prop that we get in each component. I haven't included it as an useEffect dependency intentionally, as in excercise requirements
    it's been said that we need it to load only for the first time component created (so I've understood it as when component has been mounted).*/
    const { fetchRequest, data, error, isLoading } = useFetch();
    const [translateStrings, setTranslateStrings] = useState(null);

    useEffect(function () {
        async function getTranslationStrings() {
            try {
                const result = await fetchRequest(`./translations/generaldetailssection/${lang}/strings.json`);
                if (result && result.data) {
                    setTranslateStrings(result.data);
                    return;
                }
            } catch (e) {
                console.error("error from -> GeneralDetailsSection: " + e.message);
            }
        }

        getTranslationStrings();
    }, []);

    if (!translateStrings || isLoading) {
        return <p style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>loading data for GeneralDetailsSection...</p>;
    }

    const sectionHeaderProps = {
        headerText: t(translateStrings['SECTION_TITLE']),
        subHeaderText: t(translateStrings['SECTION_SUB_TITLE'])
    };

    const nameProps = {
        value: name,
        label: t(translateStrings['SECTION_FIELD_TITLE_NAME'])
    };
    const descriptionProps = {
        value: description,
        label: t(translateStrings['SECTION_FIELD_TITLE_DESCRIPTION'])
    };
    const resourceTypeProps = {
        value: resourceType,
        label: t(translateStrings['SECTION_FIELD_TITLE_RESOURCE_TYPE'])
    };
    const pathProps = {
        value: path,
        label: t(translateStrings['SECTION_FIELD_TITLE_RESOURCE_PATH'])
    };

    return (
        <SectionContainer>
            <SectionHeader {...sectionHeaderProps} />
            <FieldsContainer>
                <TextField {...nameProps} />
                <ReadOnlyTextArea {...descriptionProps} />
                <TextField {...resourceTypeProps} />
                <TextField {...pathProps} />
            </FieldsContainer>
        </SectionContainer>
    );
}

GeneralDetailsSection.propTypes = {
    resource: PropTypes.object
};

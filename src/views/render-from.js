import React from "react";
import moment from "moment";

import Select from "components/EdSelect";
import EdInput from "components/EdInput";
import EdSelectTags from "components/EdSelectTags";
import EdUploadButton from "components/EdUploadButton";
import EdDatePick from "components/EdDatePick";

export const renderFrom = (list, props) => {
    let arr = [];
    const {
        t,
        values,
        errors,
        handleChange,
        handleBlur,
        setFieldValue
    } = props;

    const handleTagsDelete = (key,val) => {
        let data = values[key];
        data = data.filter(tag => tag !== val);
        setFieldValue(key, data);
    };

    const handleTagChange = (key, val) => {
        setFieldValue(key, val);
    };

    const handleSelectChange = (key, val) => {
        setFieldValue(key, val);
    };

    const handleDatePickChange = (key, val) => {
        setFieldValue(key, val);
    };

    const renderSelect = val => {
        let select = [];
        if (val && val.options) {
            select = val.options.filter(
                data => data.value === values[`${val.key}`]
            );
        }
        return (
            <li key={val.key}>
                <span>{t(val.name)}</span>
                <Select
                    options={val.options}
                    value={select[0]}
                    onChange={data => handleSelectChange(val.key, data.value)}
                    name={val.key}
                    width={402}
                />
            </li>
        );
    };

    const renderInput = val => {
        return (
            <li key={val.key}>
                <span>{t(val.name)}</span>
                <EdInput
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[`${val.key}`]}
                    name={val.key}
                    error={errors[`${val.key}`]}
                    style={{ width: 400 }}
                    disabled={val.disabled}
                />
            </li>
        );
    };

    const renderGroupSelect = val => {
        return (
            <li key={val.key}>
                <span>{t(val.name)}</span>
                <EdSelectTags
                    style={{
                        minHeight: "150px"
                    }}
                    name={val.key}
                    value={values[`${val.key}`]}
                    onDelete={data => handleTagsDelete(val.key,data)}
                    onChange={data => handleTagChange(val.key, data)}
                />
            </li>
        );
    };

    const renderDatePicker = val => {
        let date = values[`${val.key}`]
            ? new Date(values[`${val.key}`])
            : "";
        return (
            <li key={val.key}>
                <span>{t(val.name)}</span>
                <EdDatePick
                    selected={date}
                    onChange={data => handleDatePickChange(val.key, data)}
                    dateFormat="yyyy/MM/dd"
                />
            </li>
        );
    };

    const renderText = val => {
        return (
            <li key={val.key}>
                <span>{t(val.name)}</span>
                <EdInput
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[`${val.key}`]}
                    name={val.key}
                    error={errors[`${val.key}`]}
                    style={{ width: 400, minHeight: 100 }}
                    rows={5}
                    multiline
                    disabled={val.disabled}
                />
            </li>
        );
    };

    const renderLogoButton = val => {
        return (
            <li key={val.key}>
                <span>{t(val.name)}</span>
                <EdUploadButton value={values[`${val.key}`]} />
            </li>
        );
    };

    if (list && Array.isArray(list)) {
        list.forEach(val => {
            switch (val.type) {
                case "select":
                    arr.push(renderSelect(val, props));
                    break;
                case "input":
                    arr.push(renderInput(val, props));
                    break;
                case "tags":
                    arr.push(renderGroupSelect(val, props));
                    break;
                case "date":
                    arr.push(renderDatePicker(val, props));
                    break;
                case "text":
                    arr.push(renderText(val, props));
                    break;
                case "logo":
                    arr.push(renderLogoButton(val, props));
            }
        });
    }

    return arr;
};

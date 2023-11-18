import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function DynaFormControl({
  register,
  errors,
  type,
  formName,
  formLabel,
  validation,
  Options,
  isPassword,
  subLabel,
  defaultChecked,
  handleOnKeyUp,
  isDisabled,
  isLabeled,
  isBadge,
  badgeValue,
  isOthers
}: any) {
  const [faIcon, setFaIcon] = useState("fa-eye-slash");
  const [controlType, setControlType] = useState(type);
  const [isOther, setIsOther] = useState(false);
  const [otherValidation, setOtherValidation] = useState({});
  badgeValue = !badgeValue ? "₹" : badgeValue;

  let htmlFor = formName;
  const showPassword = () => {
    const newType = controlType == "password" ? "text" : "password";
    const newIcon = controlType == "password" ? "fa-eye" : "fa-eye-slash";
    setFaIcon(newIcon);
    setControlType(newType);
  };

  const handleOnChangeCapture = (e: any) => {
    let isOtherSel: boolean;
    if (e.target.type == "checkbox") {
      isOtherSel = e.target.checked;
    } else {
      isOtherSel = e.target.value == "Other" ? true : false;
    }
    setIsOther(isOtherSel);
    if (isOtherSel) {
      setOtherValidation({ required: true });
    } else {
      setOtherValidation({});
    }
  };

  let formHtmlLabel = validation
    ? formLabel + " *"
    : formLabel + " <small class='text-gray-400'>(Optional)</small>";
  validation = validation ? { required: formLabel + " is required!" } : {};

  if (Options) {
    if (Options != "") {
      Options = Options.split(",");
      if (controlType == "checkbox" || controlType == "radio") {
        htmlFor = Options[0].replace(/ /g, "-");
      }
    } else {
      Options = null;
    }
  }

  return (
    <>
      {(controlType !== "toggle" && !isLabeled) && (
        <label
          htmlFor={htmlFor}
          className={`${errors[formName] ? "text-[#990000]" : ""
            } font-semibold`}
          dangerouslySetInnerHTML={{ __html: formHtmlLabel }}
        ></label>
      )}
      {(controlType == "text" || controlType == "password") && (
        <div className={`relative ${errors[formName]
          ? "border-[#990000] shadow-[#9900005c]"
          : "border-gray-300"
          } shadow-md block w-full rounded`}>
          {isBadge && (<div className={`${isBadge == 'right' ? 'border-radius-left right-0 ' : 'border-radius-right left-0 '} pointer-events-none absolute inset-y-0 flex items-center pl-3 pr-3 bg-gray-100 m-[1px]`}>
            <span className="text-gray-800 font-semibold sm:text-sm">
              {badgeValue}
            </span>
          </div>)}
          <input
            onKeyUp={handleOnChangeCapture}
            {...register(formName, validation)}
            id={formName}
            disabled={isDisabled}
            type={controlType}
            autoComplete={formName}
            className={`${isBadge == 'left' ? 'pl-[45px]' : 'px-3'} placeholder-gray-500 rounded border-gray-300 appearance-none w-full py-2 text-gray-900 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
            placeholder={formLabel}
          />
          {!errors[formName] && isPassword && (
            <i
              className={`z-10 fa ${faIcon} absolute top-1 cursor-pointer right-2 text-2xl`}
              onClick={showPassword}
            ></i>
          )}
          <span
            className="absolute top-1 right-2 text-2xl"
            id={`${formName}-error-title`}
          >
            {errors[formName] && (
              <p className="text-[#990000]" role="alert">
                <i className="fa fa-info-circle"></i>
              </p>
            )}
          </span>
        </div>
      )}
      {controlType == "textarea" && (
        <div className="relative">
          <textarea
            onKeyUp={handleOnChangeCapture}
            {...register(formName, validation)}
            id={formName}
            disabled={isDisabled}
            type={controlType}
            autoComplete={formName}
            className={`${errors[formName]
              ? "border-[#990000] shadow-[#9900005c]"
              : "border-gray-300"
              } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
            placeholder={formLabel}
          ></textarea>
          {!errors[formName] && isPassword && (
            <i
              className={`z-10 fa ${faIcon} absolute top-1 cursor-pointer right-2 text-2xl`}
              onClick={showPassword}
            ></i>
          )}
          <span
            className="absolute top-1 right-2 text-2xl"
            id={`${formName}-error-title`}
          >
            {errors[formName] && (
              <p className="text-[#990000]" role="alert">
                <i className="fa fa-info-circle"></i>
              </p>
            )}
          </span>
        </div>
      )}
      {controlType == "radio" && (
        <div className="relative">
          {/* <div className={`${errors[formName] ? 'border-[#990000] shadow-[#9900005c]' : 'border-gray-300'} shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}> */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {Options.map((option: any) => (
              <div key={option.replace(/ /g, "-")}>
                <input
                  className="p-2"
                  onChangeCapture={handleOnChangeCapture}
                  {...register(formName, validation)}
                  value={option}
                  id={option.replace(/ /g, "-")}
                  type={controlType}
                  autoComplete={formName}
                  placeholder={formLabel}
                />
                <label className="ml-2" htmlFor={option.replace(/ /g, "-")}>
                  {option}
                </label>
              </div>
            ))}
            <div key="other">
              <input
                className="p-2"
                onChangeCapture={handleOnChangeCapture}
                {...register(formName, validation)}
                value={"Other"}
                id={"other-" + formName.replace(/ /g, "-")}
                type={controlType}
                autoComplete={formName}
                placeholder={formLabel}
              />
              <label
                className="ml-2"
                htmlFor={"other-" + formName.replace(/ /g, "-")}
              >
                Other{" "}
              </label>
              {isOther && (
                <div className="mt-2">
                  <input
                    {...register("other" + formName, validation)}
                    type="text"
                    className={`${errors["other" + formName]
                      ? "border-[#990000] shadow-[#9900005c]"
                      : "border-gray-300"
                      } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
                    placeholder={`Other ` + formLabel}
                  />
                </div>
              )}
            </div>
          </div>
          {/* </div>     */}
          <span
            className="absolute top-1 right-2 text-2xl"
            id={`${formName}-error-title`}
          >
            {(errors[formName] || errors["other" + formName]) && (
              <p className="text-[#990000]" role="alert">
                <i className="fa fa-info-circle"></i>
              </p>
            )}
          </span>
        </div>
      )}
      {controlType == "checkbox" && (
        <div className="relative">
          {/* <div className={`${errors[formName] ? 'border-[#990000] shadow-[#9900005c]' : 'border-gray-300'} shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}> */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {Options.map((option: any) => (
              <div key={option.replace(/ /g, "-")}>
                <input
                  className="p-2"
                  {...register(formName, validation)}
                  value={option.toString().trim()}
                  id={option.replace(/ /g, "-")}
                  type={controlType}
                  autoComplete={formName}
                  placeholder={formLabel}
                />
                <label className="ml-2" htmlFor={option.replace(/ /g, "-")}>
                  {option.toString().trim()}
                </label>
              </div>
            ))}
            <div key="other">
              <input
                className="p-2"
                onChangeCapture={handleOnChangeCapture}
                {...register(formName, validation)}
                value={"Other"}
                id={"other-" + formName.replace(/ /g, "-")}
                type={controlType}
                autoComplete={formName}
                placeholder={formLabel}
              />
              <label
                className="ml-2"
                htmlFor={"other-" + formName.replace(/ /g, "-")}
              >
                Other{" "}
              </label>
              {isOther && (
                <div className="mt-2">
                  <input
                    {...register("other" + formName, validation)}
                    type="text"
                    className={`${errors["other" + formName]
                      ? "border-[#990000] shadow-[#9900005c]"
                      : "border-gray-300"
                      } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
                    placeholder={`Other ` + formLabel}
                  />
                </div>
              )}
            </div>
          </div>
          {/* </div>     */}
          <span
            className="absolute top-1 right-2 text-2xl"
            id={`${formName}-error-title`}
          >
            {(errors[formName] || (errors["other" + formName] && isOther)) && (
              <p className="text-[#990000]" role="alert">
                <i className="fa fa-info-circle"></i>
              </p>
            )}
          </span>
        </div>
      )}
      {controlType == "toggle" && (
        <div className="relative">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register(formName, validation)}
              value={formLabel}
              id={formLabel.replace(/ /g, "-")}
              className="sr-only peer"
              defaultChecked={defaultChecked}
            />
            {/* <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none ring-2 ring-primary-color dark:peer-focus:ring-aeliya-blue rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-[#1E2A78] to-[#008EBB]"></div> */}
            <div className="h-5 w-14 rounded-full bg-[#E5E7EB] shadow-inner"></div>
            <div className="dot shadow-switch-1 absolute left-0 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 transition peer-checked:translate-x-full peer-checked:bg-green-600">
              <span className="active h-4 w-4 rounded-full bg-white"></span>
            </div>
            <div className="grid ml-3">
              <span className="text-[20px] text-[500] text-[#3A3A3A]">
                {formLabel}
              </span>
              {subLabel && <small className="text-gray-600">{subLabel}</small>}
            </div>
          </label>
        </div>
      )}
      {controlType == "select" && (
        <div className="relative">
          <select
            onChangeCapture={handleOnChangeCapture}
            id={formName}
            {...register(formName, validation)}
            className={`${errors[formName]
              ? "border-[#990000] shadow-[#9900005c]"
              : "border-gray-300"
              } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
            placeholder={formLabel}
          >
            {Options.map((option: any) => (
              <option key={option.replace(/ /g, "-")} value={option}>
                {option}
              </option>
            ))}
            {isOthers && <option key={`other`} value="Other">
              Other
            </option>}
          </select>
          {isOther && (
            <div className="mt-2">
              <input
                {...register("other" + formName, otherValidation)}
                type="text"
                className={`${errors["other" + formName]
                  ? "border-[#990000] shadow-[#9900005c]"
                  : "border-gray-300"
                  } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
                placeholder={`Other ` + formLabel}
              />
            </div>
          )}
          <span
            className="absolute top-1 right-2 text-2xl"
            id={`${formName}-error-title`}
          >
            {(errors[formName] || (errors["other" + formName] && isOther)) && (
              <p className="text-[#990000]" role="alert">
                <i className="fa fa-info-circle"></i>
              </p>
            )}
          </span>
        </div>
      )}
      {
        // <div>
        //   <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        //   <div className="relative mt-1 rounded-md shadow-sm">
        //     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pr-3 bg-gray-100 border-radius-right m-[1px]">
        //       <span className="text-gray-600 font-semibold sm:text-sm">₹</span>
        //     </div>
        //     <input type="text" name="price" id="price" className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
        //   </div>
        // </div>
        // <div>
        //   <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        //   <div className="relative mt-1 rounded-md shadow-sm">
        //     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3 pr-3 bg-gray-100 border-radius-left m-[1px]">
        //       <span className="text-gray-600 font-semibold sm:text-sm">₹</span>
        //     </div>
        //     <input type="text" name="price" id="price" className="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
        //   </div>
        // </div>
      }
      {errors[formName] && (
        <ReactTooltip
          anchorId={`${formName}-error-title`}
          place="bottom"
          variant="error"
          content={errors[formName]?.message}
        />
      )}
    </>
  );
}

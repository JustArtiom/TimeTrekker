import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AccountRow from "../components/accountRow.jsx";
import DataInput from "../components/dataInput.jsx";
import Button from "../components/button.jsx";

import "./accountSelection.css";

export default () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(null);
    const [askPassword, setAskPassword] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    useEffect(() => {
        window.api.getAllAccounts().then((d) => setAccounts(d));
    }, []);

    return askPassword ? (
        <div className="AccountCreationContainer">
            <p className="createAnAccount">Log-in {askPassword}</p>
            <DataInput
                id="password"
                required={true}
                type="password"
                onChange={(e) => {
                    setInputPassword(e.target.value);
                }}
            >
                password
            </DataInput>
            <Button
                type="Primary"
                onClick={() => {
                    if (
                        accounts.find((x) => x.id === askPassword).value
                            .password === inputPassword
                    ) {
                        sessionStorage.setItem("name", askPassword);
                        navigate("/user");
                    }
                }}
            >
                Log me in
            </Button>
            <p className="NoAccountCreateOne">
                <span
                    onClick={() => {
                        setAskPassword("");
                    }}
                >
                    Nevermind
                </span>
                , this isnt my account
            </p>
        </div>
    ) : (
        <div
            style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "700px",
                margin: "auto",
            }}
        >
            <p className="AppWhosPlaying">Who's playing?</p>
            <div className="AccountSelectionContainer">
                {accounts === null
                    ? "There are no accounts"
                    : accounts.map((a) => (
                          <AccountRow
                              key={a.id}
                              account={a}
                              onClick={() => {
                                  setAskPassword(a.id);
                                  //   sessionStorage.setItem("name", a.id);
                                  //   navigate("/user");
                              }}
                          />
                      ))}
            </div>
            <p className="NoAccountCreateOne">
                No account?{" "}
                <span
                    onClick={() => {
                        navigate("/signup");
                    }}
                >
                    Create one
                </span>
            </p>
        </div>
    );
};

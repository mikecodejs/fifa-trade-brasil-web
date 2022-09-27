import { faCloudArrowUp, faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormData from "form-data";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { Nav } from "../../components/Nav";
import { Api } from "../../services/axios";
import {
  converterDatePayment,
  converterName,
  currency,
  sanitizeString
} from "../../utils";
import "./styles.css";

type Supporter = {
  name: string;
  cpfOrCnpj: string;
  email: string;
  telephone: string;
};

type Payment = {
  amount: number;
  rewardTrack: string;
  supportCompetence: string;
  statusPayment: string;
  statusDescription: string;
  paymentMethod: string;
};

type Address = {
  zipCode: string;
  street: string;
  numberOfHouse: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  fullAddress: string;
};

export type Customer = {
  apoiaseID: string;
  supporter: Supporter;
  payment: Payment;
  address: Address;
  shipping: string;
};

export const Transaction = () => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [customers, setCustomers] = useState<Customer[]>([] as Customer[]);
  const [loading, setLoading] = useState<boolean>();
  const [termSearched, setTermSearched] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<File>();
  const [viewModal, setViewModal] = useState<boolean>(false);

  const getCustomers = async () => {
    const { customers } = await (await Api.get(`/v1/csv/find-many`)).data;

    if (customers) {
      setCustomers(customers);
      setLoading(true);
    } else {
      setCustomers([]);
      setLoading(true);
    }
  };

  useEffect(() => {
    getCustomers();
  }, [setCustomers]);

  const handleSendFile = async () => {
    const toastUpload = toast.loading("Saving data...");

    const formData = new FormData();
    formData.append("csv", fileSelected);

    await Api.post("/v1/csv/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        toast.update(toastUpload, {
          render: data.message,
          type: "success",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          isLoading: false,
        });

        getCustomers();
      })
      .catch((error) => {
        toast.update(toastUpload, {
          render: error.response.data.error,
          type: "error",
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          isLoading: false,
        });
      });
  };

  const handleFileSelect = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.currentTarget.files) {
      if (ev.currentTarget.files[0].type !== "text/csv") {
        return toast.error("O arquivo espera deve ter a extensão .csv", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          isLoading: false,
        });
      } else {
        setFileSelected(ev.currentTarget.files[0]);
      }
    }
  };

  const handleTelephone = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ev.preventDefault();

    const telephone = String(ev.currentTarget.textContent);

    toast.info(`Número de telefone copiado ${telephone}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      isLoading: false,
    });

    navigator.clipboard.writeText(telephone);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Transações - FIFA Trade Brasil 🕹️</title>
        <meta name="title" content={"Transações - FIFA Trade Brasil 🕹️"} />
        <meta
          name="description"
          content={
            "dashboard feito para gerenciar os dados do apoiase do fifa trade brasil"
          }
        />
        <meta property="og:type" content="" />
        <meta
          property="og:url"
          content="https://fifa-trade-brasil-web.herokuapp.com/"
        />
        <meta
          property="og:title"
          content={"Transações - FIFA Trade Brasil 🕹️"}
        />
        <meta
          property="og:description"
          content={
            "dashboard feito para gerenciar os dados do apoiase do fifa trade brasil"
          }
        />
        <meta property="og:image" content={""} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="ID_APP_FACEBOOK" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://fifa-trade-brasil-web.herokuapp.com/"
        />
        <meta
          property="twitter:title"
          content={"Transações - FIFA Trade Brasil 🕹️"}
        />
        <meta
          property="twitter:description"
          content={
            "dashboard feito para gerenciar os dados do apoiase do fifa trade brasil"
          }
        />
        <meta property="twitter:image" content={""} />
      </Helmet>
      {!loading ? (
        <Loading />
      ) : (
        <div className="container">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Nav />
          {viewModal ? (
            <Modal
              customer={customer}
              onCloseModal={async () => setViewModal(false)}
            />
          ) : (
            false
          )}
          <div className="panel-container">
            <div className="panel">
              <div className="title">
                <h2>Transações</h2>
              </div>
              <div className="menu">
                <div className="actions-list">
                  <label htmlFor="select-list">
                    <span className="select-list">
                      <FontAwesomeIcon icon={faFileCode} /> Selecionar
                    </span>
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="select-list"
                    accept=".csv"
                    onChange={handleFileSelect}
                  />
                  <button className="add-list" onClick={handleSendFile}>
                    <FontAwesomeIcon icon={faCloudArrowUp} /> Subir
                  </button>
                </div>
                <div className="search">
                  <input
                    type="search"
                    placeholder="O que você está buscando?"
                    onKeyUp={(e) =>
                      setTermSearched(sanitizeString(e.currentTarget.value))
                    }
                  />
                </div>
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Apoiador</th>
                      <th>E-mail</th>
                      <th>Telefone</th>
                      <th>Valor</th>
                      <th>Pago em</th>
                      <th>Transação ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length > 0 ? (
                      customers
                        ?.filter(
                          (customer) =>
                            customer.supporter.name
                              .toLowerCase()
                              .includes(termSearched.toLowerCase()) ||
                            customer.supporter.cpfOrCnpj
                              .toLowerCase()
                              .includes(termSearched.toLowerCase()) ||
                            customer.payment.supportCompetence
                              .toLowerCase()
                              .includes(termSearched.toLowerCase()),
                        )
                        .map((customer) => (
                          <tr
                            key={customer.apoiaseID}
                            onDoubleClick={() => {
                              setCustomer(customer);
                              setViewModal(true);
                            }}
                          >
                            <td>{converterName(customer.supporter.name)}</td>
                            <td>{customer.supporter.email}</td>
                            <td>
                              <button
                                className="clipboard-telephone"
                                onClick={(ev) => handleTelephone(ev)}
                              >
                                {customer.supporter.telephone}
                              </button>
                            </td>
                            <td>
                              <span className="amount">
                                {currency(customer.payment.amount)}
                              </span>
                            </td>
                            <td>
                              {converterDatePayment(
                                customer.payment.supportCompetence,
                              )}
                            </td>
                            <td>{customer.apoiaseID}</td>
                            <td>
                              {sanitizeString(
                                customer.payment.statusPayment,
                              ) === sanitizeString("Pago") ? (
                                <span className="paid">
                                  {customer.payment.statusPayment}
                                </span>
                              ) : (
                                <span className="pending">
                                  {customer.payment.statusPayment}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <td colSpan={5}>
                        <b>Não há dados cadastrados!</b>
                      </td>
                    )}
                  </tbody>
                  {/* <tfoot>
                <tr>
                  <td colSpan={6}>
                    <div className="pagination-buttons">
                      <button>1</button>
                      <button>2</button>
                      <button>3</button>
                      <button>4</button>
                    </div>
                  </td>
                </tr>
              </tfoot> */}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

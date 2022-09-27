import { faCloudArrowUp, faFileCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormData from "form-data";
import { useEffect, useState } from "react";
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

  useEffect(() => {
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

    getCustomers();
  }, [setCustomers]);

  const handleSendFile = async () => {
    setLoading(false);

    const formData = new FormData();
    formData.append("csv", fileSelected);

    await Api.post("/v1/csv/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setLoading(true);
  };

  const handleFileSelect = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.currentTarget.files) {
      setFileSelected(ev.currentTarget.files[0]);
    }
  };

  return !loading ? (
    <Loading />
  ) : (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
                  <th>Valor</th>
                  <th>Pago em</th>
                  <th>Transação ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers
                  ?.filter(
                    (customer) =>
                      sanitizeString(customer.supporter.name).includes(
                        termSearched,
                      ) ||
                      sanitizeString(customer.supporter.cpfOrCnpj).includes(
                        termSearched,
                      ) ||
                      sanitizeString(
                        customer.payment.supportCompetence,
                      ).includes(termSearched),
                  )
                  .map((customer) => (
                    <tr
                      key={customer.apoiaseID}
                      onClick={() => {
                        setCustomer(customer);
                        setViewModal(true);
                      }}
                    >
                      <td>{converterName(customer.supporter.name)}</td>
                      <td>{customer.supporter.email}</td>
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
                        {sanitizeString(customer.payment.statusPayment) ===
                        sanitizeString("Pago") ? (
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
                  ))}
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
  );
};

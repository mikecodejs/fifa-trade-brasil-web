import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Customer } from "../../screens/Transaction";
import {
  converterDatePayment,
  converterMethodPayment,
  currency
} from "../../utils";
import "./styles.css";

type ModalProps = {
  customer: Customer;
  onCloseModal: () => {};
};

export const Modal = ({ customer, onCloseModal }: ModalProps) => {
  return (
    <div className="modal-container">
      <button className="modal-close" onClick={onCloseModal}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="modal-table">
        <table>
          <tr>
            <th colSpan={5}>
              <h3>Dados do apoiador</h3>
            </th>
          </tr>
          <tr>
            <td>
              <b>ApoiaseID</b>: {customer.apoiaseID}
            </td>
            <td>
              <b>Nome</b>: {customer.supporter.name}
            </td>
            <td>
              <b>E-mail</b>: {customer.supporter.email}
            </td>
          </tr>
          <tr>
            <td>
              <b>Documento</b>: {customer.supporter.cpfOrCnpj}
            </td>
            <td>
              <b>Telefone</b>: {customer.supporter.telephone}
            </td>
          </tr>
          <tr>
            <th colSpan={5}>
              <h3>Dados de pagamento</h3>
            </th>
          </tr>
          <tr>
            <td>
              <b>Valor</b>: {currency(customer.payment.amount)}
            </td>
            <td>
              <b>Status do pagamento</b>: {customer.payment.statusPayment}
            </td>
            <td colSpan={2}>
              <b>Método de pagamento</b>:{" "}
              {converterMethodPayment(customer.payment.paymentMethod)}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <b>Descrição do status</b>: {customer.payment.statusDescription}
            </td>
            <td>
              <b>Competência do apoio</b>:{" "}
              {converterDatePayment(customer.payment.supportCompetence)}
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <b>Faixa de recompensa</b>: {customer.payment.rewardTrack}
            </td>
          </tr>
          <tr>
            <th colSpan={5}>
              <h3>Dados de endereço</h3>
            </th>
          </tr>
          <tr>
            <td>
              <b>CEP</b>: {customer.address.zipCode}
            </td>
            <td>
              <b>Rua</b>: {customer.address.street}
            </td>
            <td>
              <b>Nº da casa</b>: {customer.address.numberOfHouse}
            </td>
          </tr>
          <tr>
            <td>
              <b>Complemento</b>: {customer.address.complement}
            </td>
            <td>
              <b>Bairro</b>: {customer.address.neighborhood}
            </td>
            <td>
              <b>Cidade</b>: {customer.address.city}
            </td>
          </tr>
          <tr>
            <td>
              <b>Estado</b>: {customer.address.state}
            </td>
            <td>
              <b>País</b>: {customer.address.country}
            </td>
            <td>
              <b>Endereço completo</b>: {customer.address.fullAddress}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

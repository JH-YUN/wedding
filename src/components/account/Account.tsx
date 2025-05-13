import { createSignal, For } from "solid-js";
import { BankAccount } from "../../types";
import weddingConfig from "../../data/wedding-config.json";
import "./Account.css";

export default function Account() {
  const [groomAccordionOpen, setGroomAccordionOpen] = createSignal(false);
  const [brideAccordionOpen, setBrideAccordionOpen] = createSignal(false);
  const [copiedAccountId, setCopiedAccountId] = createSignal<string | null>(
    null
  );

  const toggleGroomAccordion = () =>
    setGroomAccordionOpen(!groomAccordionOpen());
  const toggleBrideAccordion = () =>
    setBrideAccordionOpen(!brideAccordionOpen());

  const copyAccountNumber = (account: BankAccount) => {
    navigator.clipboard
      .writeText(account.accountNumber)
      .then(() => {
        // 복사된 계좌번호 ID 설정 (은행명+계좌번호로 고유 ID 생성)
        const accountId = `${account.bankName}-${account.accountNumber}`;
        setCopiedAccountId(accountId);

        // 알림창 대신 시각적 피드백 후 1.5초 뒤 상태 초기화
        setTimeout(() => {
          setCopiedAccountId(null);
        }, 1500);
      })
      .catch((err) => {
        console.error("계좌번호 복사 실패:", err);
        alert("계좌번호 복사에 실패했습니다. 직접 선택하여 복사해주세요.");
      });
  };

  // 계좌의 고유 ID를 생성하는 함수
  const getAccountId = (account: BankAccount) => {
    return `${account.bankName}-${account.accountNumber}`;
  };

  return (
    <section class="account-section">
      <h2 class="section-title">마음 전하실 곳</h2>

      <div class="account-container">
        {/* 신랑측 계좌 아코디언 */}
        <div class="account-accordion">
          <button
            class={`accordion-button ${groomAccordionOpen() ? "active" : ""}`}
            onClick={toggleGroomAccordion}
          >
            <span class="accordion-title">신랑측 계좌번호</span>
            <span class="accordion-icon">
              {groomAccordionOpen() ? "−" : "+"}
            </span>
          </button>

          <div
            class={`accordion-content ${groomAccordionOpen() ? "open" : ""}`}
          >
            <For each={weddingConfig.accountInfo.groomAccounts}>
              {(account) => (
                <div
                  class={`account-item ${
                    copiedAccountId() === getAccountId(account) ? "copied" : ""
                  }`}
                  onClick={() => copyAccountNumber(account)}
                >
                  <div class="account-bank">{account.bankName}</div>
                  <div class="account-number">{account.accountNumber}</div>
                  <div class="account-holder">{account.accountHolder}</div>
                  <div class="copy-hint">터치하면 복사됩니다</div>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* 신부측 계좌 아코디언 */}
        <div class="account-accordion">
          <button
            class={`accordion-button ${brideAccordionOpen() ? "active" : ""}`}
            onClick={toggleBrideAccordion}
          >
            <span class="accordion-title">신부측 계좌번호</span>
            <span class="accordion-icon">
              {brideAccordionOpen() ? "−" : "+"}
            </span>
          </button>

          <div
            class={`accordion-content ${brideAccordionOpen() ? "open" : ""}`}
          >
            <For each={weddingConfig.accountInfo.brideAccounts}>
              {(account) => (
                <div
                  class={`account-item ${
                    copiedAccountId() === getAccountId(account) ? "copied" : ""
                  }`}
                  onClick={() => copyAccountNumber(account)}
                >
                  <div class="account-bank">{account.bankName}</div>
                  <div class="account-number">{account.accountNumber}</div>
                  <div class="account-holder">{account.accountHolder}</div>
                  <div class="copy-hint">터치하면 복사됩니다</div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}

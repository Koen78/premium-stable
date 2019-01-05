import { element, by, ElementFinder } from 'protractor';

export class MedCheckDetComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-med-check-det-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-med-check-det-my-suffix div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class MedCheckDetUpdatePage {
    pageTitle = element(by.id('jhi-med-check-det-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    resultInput = element(by.id('field_result'));
    medCheckSelect = element(by.id('field_medCheck'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setResultInput(result) {
        await this.resultInput.sendKeys(result);
    }

    async getResultInput() {
        return this.resultInput.getAttribute('value');
    }

    async medCheckSelectLastOption() {
        await this.medCheckSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async medCheckSelectOption(option) {
        await this.medCheckSelect.sendKeys(option);
    }

    getMedCheckSelect(): ElementFinder {
        return this.medCheckSelect;
    }

    async getMedCheckSelectedOption() {
        return this.medCheckSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class MedCheckDetDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-medCheckDet-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-medCheckDet'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

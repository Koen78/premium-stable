import { element, by, ElementFinder } from 'protractor';

export class MedCheckComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-med-check-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-med-check-my-suffix div h2#page-heading span')).first();

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

export class MedCheckUpdatePage {
    pageTitle = element(by.id('jhi-med-check-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    shortDescriptionInput = element(by.id('field_shortDescription'));
    resultDescriptionInput = element(by.id('field_resultDescription'));
    pdfInput = element(by.id('file_pdf'));
    horseSelect = element(by.id('field_horse'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setShortDescriptionInput(shortDescription) {
        await this.shortDescriptionInput.sendKeys(shortDescription);
    }

    async getShortDescriptionInput() {
        return this.shortDescriptionInput.getAttribute('value');
    }

    async setResultDescriptionInput(resultDescription) {
        await this.resultDescriptionInput.sendKeys(resultDescription);
    }

    async getResultDescriptionInput() {
        return this.resultDescriptionInput.getAttribute('value');
    }

    async setPdfInput(pdf) {
        await this.pdfInput.sendKeys(pdf);
    }

    async getPdfInput() {
        return this.pdfInput.getAttribute('value');
    }

    async horseSelectLastOption() {
        await this.horseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async horseSelectOption(option) {
        await this.horseSelect.sendKeys(option);
    }

    getHorseSelect(): ElementFinder {
        return this.horseSelect;
    }

    async getHorseSelectedOption() {
        return this.horseSelect.element(by.css('option:checked')).getText();
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

export class MedCheckDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-medCheck-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-medCheck'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

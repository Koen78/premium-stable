import { element, by, ElementFinder } from 'protractor';

export class MedCheckXrayComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-med-check-xray-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-med-check-xray-my-suffix div h2#page-heading span')).first();

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

export class MedCheckXrayUpdatePage {
    pageTitle = element(by.id('jhi-med-check-xray-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    imageInput = element(by.id('file_image'));
    medCheckSelect = element(by.id('field_medCheck'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
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

export class MedCheckXrayDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-medCheckXray-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-medCheckXray'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

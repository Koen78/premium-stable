import { element, by, ElementFinder } from 'protractor';

export class CompetitionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-competition-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-competition-my-suffix div h2#page-heading span')).first();

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

export class CompetitionUpdatePage {
    pageTitle = element(by.id('jhi-competition-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    descriptionInput = element(by.id('field_description'));
    resultInput = element(by.id('field_result'));
    horseSelect = element(by.id('field_horse'));
    raceSelect = element(by.id('field_race'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setResultInput(result) {
        await this.resultInput.sendKeys(result);
    }

    async getResultInput() {
        return this.resultInput.getAttribute('value');
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

    async raceSelectLastOption() {
        await this.raceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async raceSelectOption(option) {
        await this.raceSelect.sendKeys(option);
    }

    getRaceSelect(): ElementFinder {
        return this.raceSelect;
    }

    async getRaceSelectedOption() {
        return this.raceSelect.element(by.css('option:checked')).getText();
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

export class CompetitionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-competition-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-competition'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

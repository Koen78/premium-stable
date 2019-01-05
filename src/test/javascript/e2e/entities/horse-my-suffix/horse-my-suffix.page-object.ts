import { element, by, ElementFinder } from 'protractor';

export class HorseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-horse-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-horse-my-suffix div h2#page-heading span')).first();

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

export class HorseUpdatePage {
    pageTitle = element(by.id('jhi-horse-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    birthdayInput = element(by.id('field_birthday'));
    descentFatherInput = element(by.id('field_descentFather'));
    descentMotherInput = element(by.id('field_descentMother'));
    heightInput = element(by.id('field_height'));
    commentInput = element(by.id('field_comment'));
    stableSelect = element(by.id('field_stable'));
    levelDressageSelect = element(by.id('field_levelDressage'));
    levelJumpingSelect = element(by.id('field_levelJumping'));
    genderSelect = element(by.id('field_gender'));
    colorSelect = element(by.id('field_color'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setBirthdayInput(birthday) {
        await this.birthdayInput.sendKeys(birthday);
    }

    async getBirthdayInput() {
        return this.birthdayInput.getAttribute('value');
    }

    async setDescentFatherInput(descentFather) {
        await this.descentFatherInput.sendKeys(descentFather);
    }

    async getDescentFatherInput() {
        return this.descentFatherInput.getAttribute('value');
    }

    async setDescentMotherInput(descentMother) {
        await this.descentMotherInput.sendKeys(descentMother);
    }

    async getDescentMotherInput() {
        return this.descentMotherInput.getAttribute('value');
    }

    async setHeightInput(height) {
        await this.heightInput.sendKeys(height);
    }

    async getHeightInput() {
        return this.heightInput.getAttribute('value');
    }

    async setCommentInput(comment) {
        await this.commentInput.sendKeys(comment);
    }

    async getCommentInput() {
        return this.commentInput.getAttribute('value');
    }

    async stableSelectLastOption() {
        await this.stableSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async stableSelectOption(option) {
        await this.stableSelect.sendKeys(option);
    }

    getStableSelect(): ElementFinder {
        return this.stableSelect;
    }

    async getStableSelectedOption() {
        return this.stableSelect.element(by.css('option:checked')).getText();
    }

    async levelDressageSelectLastOption() {
        await this.levelDressageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async levelDressageSelectOption(option) {
        await this.levelDressageSelect.sendKeys(option);
    }

    getLevelDressageSelect(): ElementFinder {
        return this.levelDressageSelect;
    }

    async getLevelDressageSelectedOption() {
        return this.levelDressageSelect.element(by.css('option:checked')).getText();
    }

    async levelJumpingSelectLastOption() {
        await this.levelJumpingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async levelJumpingSelectOption(option) {
        await this.levelJumpingSelect.sendKeys(option);
    }

    getLevelJumpingSelect(): ElementFinder {
        return this.levelJumpingSelect;
    }

    async getLevelJumpingSelectedOption() {
        return this.levelJumpingSelect.element(by.css('option:checked')).getText();
    }

    async genderSelectLastOption() {
        await this.genderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async genderSelectOption(option) {
        await this.genderSelect.sendKeys(option);
    }

    getGenderSelect(): ElementFinder {
        return this.genderSelect;
    }

    async getGenderSelectedOption() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    async colorSelectLastOption() {
        await this.colorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async colorSelectOption(option) {
        await this.colorSelect.sendKeys(option);
    }

    getColorSelect(): ElementFinder {
        return this.colorSelect;
    }

    async getColorSelectedOption() {
        return this.colorSelect.element(by.css('option:checked')).getText();
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

export class HorseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-horse-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-horse'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

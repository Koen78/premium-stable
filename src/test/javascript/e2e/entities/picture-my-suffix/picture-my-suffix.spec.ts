/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PictureComponentsPage, PictureDeleteDialog, PictureUpdatePage } from './picture-my-suffix.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Picture e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let pictureUpdatePage: PictureUpdatePage;
    let pictureComponentsPage: PictureComponentsPage;
    let pictureDeleteDialog: PictureDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Pictures', async () => {
        await navBarPage.goToEntity('picture-my-suffix');
        pictureComponentsPage = new PictureComponentsPage();
        expect(await pictureComponentsPage.getTitle()).to.eq('Pictures');
    });

    it('should load create Picture page', async () => {
        await pictureComponentsPage.clickOnCreateButton();
        pictureUpdatePage = new PictureUpdatePage();
        expect(await pictureUpdatePage.getPageTitle()).to.eq('Create or edit a Picture');
        await pictureUpdatePage.cancel();
    });

    it('should create and save Pictures', async () => {
        const nbButtonsBeforeCreate = await pictureComponentsPage.countDeleteButtons();

        await pictureComponentsPage.clickOnCreateButton();
        await promise.all([
            pictureUpdatePage.setDateInput('2000-12-31'),
            pictureUpdatePage.setDescriptionInput('description'),
            pictureUpdatePage.setImageInput(absolutePath),
            pictureUpdatePage.horseSelectLastOption()
        ]);
        expect(await pictureUpdatePage.getDateInput()).to.eq('2000-12-31');
        expect(await pictureUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await pictureUpdatePage.getImageInput()).to.endsWith(fileNameToUpload);
        await pictureUpdatePage.save();
        expect(await pictureUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await pictureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Picture', async () => {
        const nbButtonsBeforeDelete = await pictureComponentsPage.countDeleteButtons();
        await pictureComponentsPage.clickOnLastDeleteButton();

        pictureDeleteDialog = new PictureDeleteDialog();
        expect(await pictureDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Picture?');
        await pictureDeleteDialog.clickOnConfirmButton();

        expect(await pictureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
